
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';

// Schemas
import LocationsSchema from '../../bus/Location/schemas/locations.graphql';
import ScenesSchema from '../../bus/Scene/schemas/scenes.graphql';

// Components
import { Modal, LocationsTable } from '..';

// Apollo hooks
import {
    useLocationsQuery,
    useCreateLocationMutation,
    useDeleteLocationMutation,
    useUpdateLocationMutation,
} from '../../bus/Location';
import { useScenesQuery } from '../../bus/Scene';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { ModalHeader, Button, Input } from '../../elements';

// Styles
import { Main, Footer, Nav, RedoContainer } from './styles';

// Types
type Params = { projectId: string }
type PropTypes = {
    closeHandler: () => void
    locationIds?: String[]
    handler?: (locationId: string) => void
    saveHandler?: Function
}

// Instruments
const initialForm = {
    location: '',
};

let timeOutId: number | undefined = void 0;

export const LocationsModal: FC<PropTypes> = ({
    closeHandler, locationIds, handler, saveHandler,
}) => {
    const { push } = useHistory();
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const client = useApolloClient();
    const { data, loading } = useLocationsQuery({ projectId });
    const { data: scenesData, loading: scenesLoading } = useScenesQuery({ projectId });
    const [ createLocation ] = useCreateLocationMutation({ projectId });
    const [ updateLocation ] = useUpdateLocationMutation();
    const [ deleteLocation ] = useDeleteLocationMutation();
    const [ form, setForm, _, resetForm ] = useForm<typeof initialForm>(initialForm); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [ isPlusRotate, setPlusRotateState ] = useState(false);
    const [ isTrashRotate, setTrashRotateState ] = useState(false);

    if (loading || !data || scenesLoading || !scenesData) {
        return <div>Loading...</div>;
    }

    const filterHandler = () => {
        return data.locations.filter((location) => location.name.includes(form.location))
            .sort((a, b) => a.name.length > b.name.length ? 1 : -1);
    };

    const addNewLocationHandler = async () => {
        const isLocationExist = data.locations.some((location) => location.name === form.location);
        if (form.location === '' || isLocationExist) {
            return;
        }

        if (!timeOutId) {
            setPlusRotateState(true);
            timeOutId = setTimeout(() => {
                setTrashRotateState(false);
                clearTimeout(timeOutId);
                timeOutId = void 0;
            }, 500);
        }

        try {
            const response = await createLocation({ variables: { input: { name: form.location }, projectId }});
            response && response.data && void resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const updateLocationHandler = async (locationId: string, name: string) => {
        const response = await updateLocation({ variables: { input: { name }, locationId  }});
        if (response && response.data) {
            return true;
        }

        return false;
    };

    const deleteLocationHandler = async (locationId: string) => {
        const location = data.locations.find((location) => location.id === locationId);

        if (!location) {
            throw new Error('Delete location failed');
        }

        // eslint-disable-next-line no-alert
        const isContinue = window.confirm(`Confirm delete location: ${location.name}`);

        if (!isContinue) {
            return;
        }

        const response = await deleteLocation({ variables: { locationId }});

        if (!response?.data?.deleteLocation) {
            throw new Error('Location has not been deleted');
        }

        client.writeQuery({
            query:     LocationsSchema,
            variables: { projectId },
            data:      {
                locations: data.locations.filter((location) => location.id !== locationId),
            },
        });

        client.writeQuery({
            query:     ScenesSchema,
            variables: { projectId },
            data:      {
                scenes: scenesData.scenes.map((scene) => {
                    if (scene.locations.some((location) => location.id === locationId)) {
                        return {
                            ...scene,
                            locations: scene.locations.filter((location) => location.id !== locationId),
                        };
                    }

                    return scene;
                }),
            },
        });
    };

    const resetFormHandler = () => {
        if (!timeOutId) {
            resetForm();
            setTrashRotateState(true);
            timeOutId = setTimeout(() => {
                setTrashRotateState(false);
                clearTimeout(timeOutId);
                timeOutId = void 0;
            }, 500);
        }
    };

    return (
        <Modal closeHandler = { closeHandler }>
            <ModalHeader style = {{ backgroundColor: theme.scene.secondary }}>Locations</ModalHeader>
            <Nav>
                <section>
                    <RedoContainer
                        isRotate = { isPlusRotate }
                        onClick = { addNewLocationHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 20, height: 20 }}
                        />
                    </RedoContainer>
                    <RedoContainer
                        isRotate = { isTrashRotate }
                        onClick = { resetFormHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 20, height: 20 }}
                        />
                    </RedoContainer>
                </section>
                <Input
                    name = 'location'
                    placeholder = 'Location name...'
                    value = { form.location }
                    onChange = { setForm }
                />
            </Nav>
            <Main>
                <LocationsTable
                    deleteLocationHandler = { deleteLocationHandler }
                    handler = { handler }
                    locationIds = { locationIds }
                    locations = { filterHandler() }
                    updateLocationHandler = { updateLocationHandler }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.scene.primary }}>
                <Button onClick = {
                    () => saveHandler
                        ? void saveHandler()
                        : void push(`/${projectId}/scenes`)
                }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = { saveHandler ? 'save' : 'reply' }
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Modal>
    );
};

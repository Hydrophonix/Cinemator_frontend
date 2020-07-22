
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';

// Schemas
import LocationsSchema from '../../bus/Location/schemas/locations.graphql';

// Components
import { Modal, LocationsTable } from '..';

// Apollo hooks
import { useLocationsQuery, useCreateLocationMutation, useDeleteLocationMutation } from '../../bus/Location';

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
    locationIdsArray?: String[]
    setLocationIdsArray?: (locationId: string) => void
    saveHandler?: Function
}

// Instruments
const initialForm = {
    location: '',
};

let timeOutId: number | undefined = void 0;

export const LocationsModal: FC<PropTypes> = ({
    closeHandler, locationIdsArray, setLocationIdsArray, saveHandler,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const client = useApolloClient();
    const { data, loading } = useLocationsQuery({ projectId });
    const [ createLocation ] = useCreateLocationMutation({ projectId });
    const [ deleteLocation ] = useDeleteLocationMutation();
    const [ form, setForm, _, resetForm ] = useForm<typeof initialForm>(initialForm); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [ isPlusRotate, setPlusRotateState ] = useState(false);
    const [ isTrashRotate, setTrashRotateState ] = useState(false);

    if (loading || !data) {
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

    const deleteLocationHandler = async (locationId: string) => {
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
                    locationIdsArray = { locationIdsArray }
                    locations = { filterHandler() }
                    setLocationIdsArray = { setLocationIdsArray }
                />
            </Main>
            <Footer style = {{ backgroundColor: theme.scene.primary }}>
                <Button onClick = { () => saveHandler && void saveHandler() }>
                    <FontAwesomeIcon
                        color = '#000'
                        icon = 'save'
                        style = {{ width: 26, height: 26 }}
                    />
                </Button>
            </Footer>
        </Modal>
    );
};

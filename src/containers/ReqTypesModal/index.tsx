
// Core
import React, { FC, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ThemeContext } from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';

// Schemas
import ReqTypesSchema from '../../bus/ReqType/schemas/reqTypes.graphql';
import RequisitesSchema from '../../bus/Requisite/schemas/requisites.graphql';

// Components
import { Modal, ReqTypesTable } from '../../components';

// Apollo hooks
import {
    useReqTypesQuery,
    useCreateReqTypeMutation,
    useUpdateReqTypeMutation,
    useDeleteReqTypeMutation,
} from '../../bus/ReqType';
import { useRequisitesQuery } from '../../bus/Requisite';

// Hooks
import { useForm } from '../../hooks';

// Elements
import { ModalHeader, Button, Input } from '../../elements';

// Styles
import { Main, Footer, IconsContainer, Icon } from './styles';

// Types
type Params = { projectId: string }
type PropTypes = {
    closeHandler: () => void
    reqTypeIds?: String[]
    handler?: (reqTypeId: string) => void
    saveHandler?: Function
    saveHandlerLoading?: boolean
}

// Instruments
const initialForm = {
    reqType: '',
};

let timeOutId: number | undefined = void 0;

export const ReqTypesModal: FC<PropTypes> = ({
    closeHandler, reqTypeIds, handler, saveHandler, saveHandlerLoading,
}) => {
    const { projectId } = useParams<Params>();
    const theme = useContext(ThemeContext);
    const client = useApolloClient();
    const { data, loading } = useReqTypesQuery({ projectId });
    const { data: requisitesData, loading: requisitesLoading } = useRequisitesQuery({ projectId });
    const [ createReqType, { loading: createReqTypeLoading }] = useCreateReqTypeMutation({ projectId });
    const [ updateReqType, { loading: updateReqTypeLoading }] = useUpdateReqTypeMutation();
    const [ deleteReqType, { loading: deleteReqTypeLoading }] = useDeleteReqTypeMutation();
    const [ form, setForm, _, resetForm ] = useForm<typeof initialForm>(initialForm); // eslint-disable-line @typescript-eslint/no-unused-vars
    const [ isPlusRotate, setPlusRotateState ] = useState(false);
    const [ isTrashRotate, setTrashRotateState ] = useState(false);
    const isSpinnerActive = saveHandlerLoading || createReqTypeLoading || updateReqTypeLoading || deleteReqTypeLoading;

    if (loading || !data || requisitesLoading || !requisitesData) {
        return null;
    }

    const filterHandler = () => {
        return data.reqTypes.filter(
            (reqType) => reqType.name.toLocaleLowerCase().includes(form.reqType.toLocaleLowerCase()),
        );
    };

    const addNewReqTypeHandler = async () => {
        const isReqTypeExist = data.reqTypes.some((reqType) => reqType.name === form.reqType);

        if (form.reqType === '' || isReqTypeExist) {
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
            const response = await createReqType({
                variables: { input: { name: form.reqType },
                    projectId,
                }});

            response && response.data && void resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const updateReqTypeHandler = async (reqTypeId: string, name: string) => {
        const response = await updateReqType({ variables: { input: { name }, reqTypeId  }});
        if (response && response.data) {
            return true;
        }

        return false;
    };

    const deleteReqTypeHandler = async (reqTypeId: string) => {
        const reqType = data.reqTypes.find((reqType) => reqType.id === reqTypeId);

        if (!reqType) {
            throw new Error('Delete requisite type failed');
        }

        // eslint-disable-next-line no-alert
        const isContinue = window.confirm(`Confirm delete requisite type: ${reqType.name}`);

        if (!isContinue) {
            return;
        }

        const response = await deleteReqType({ variables: { reqTypeId }});

        if (!response?.data?.deleteReqType) {
            throw new Error('Type has not been deleted');
        }

        client.writeQuery({
            query:     ReqTypesSchema,
            variables: { projectId },
            data:      {
                reqTypes: data.reqTypes.filter((reqType) => reqType.id !== reqTypeId),
            },
        });

        client.writeQuery({
            query:     RequisitesSchema,
            variables: { projectId },
            data:      {
                requisites: requisitesData.requisites.map((requisite) => {
                    if (requisite.reqTypes.some((reqType) => reqType.id === reqTypeId)) {
                        return {
                            ...requisite,
                            reqTypes: requisite.reqTypes.filter((reqType) => reqType.id !== reqTypeId),
                        };
                    }

                    return requisite;
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
        <Modal
            closeHandler = { closeHandler }
            spinner = { isSpinnerActive }>
            <ModalHeader style = {{ backgroundColor: theme.requisite.secondary }}>Types</ModalHeader>
            <IconsContainer>
                <section>
                    <Icon
                        isRotate = { isPlusRotate }
                        onClick = { addNewReqTypeHandler }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'plus'
                            style = {{ width: 20, height: 20 }}
                            title = { 'Add location' }
                        />
                    </Icon>
                    <Icon
                        isRotate = { isTrashRotate }
                        onClick = { () => form.reqType !== '' && void resetFormHandler() }>
                        <FontAwesomeIcon
                            color = '#000'
                            icon = 'trash-alt'
                            style = {{ width: 20, height: 20 }}
                            title = { 'Clear' }
                        />
                    </Icon>
                </section>
                <Input
                    name = 'reqType'
                    placeholder = 'Type name...'
                    value = { form.reqType }
                    onChange = { setForm }
                />
            </IconsContainer>
            <Main>
                <ReqTypesTable
                    deleteReqTypeHandler = { deleteReqTypeHandler }
                    handler = { handler }
                    reqTypeIds = { reqTypeIds }
                    reqTypes = { filterHandler() }
                    updateReqTypeHandler = { updateReqTypeHandler }
                />
            </Main>
            <Footer>
                <Button
                    title = { saveHandler ? 'Save' : 'Close' }
                    onClick = { () => saveHandler ? void saveHandler() : void closeHandler() }>
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

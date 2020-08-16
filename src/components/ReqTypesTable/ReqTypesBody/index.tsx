// Core
import React, { FC, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Elements
import { Button, Input } from '../../../elements';

// Redux
import { useTogglersRedux } from '../../../@init/redux/togglers';

// Styles
import { Tbody } from '../styles';
import { UpdateContainer } from './styles';

// Types
import { ReqTypes_reqTypes } from '../../../bus/ReqType';

type Proptypes = {
    reqTypes: ReqTypes_reqTypes[]
    updateReqTypeHandler: (reqType: string, name: string) => Promise<boolean>
    deleteReqTypeHandler: (reqType: string) => void
    reqTypeIds?: String[]
    handler?: (reqType: string) => void
}

export const ReqTypesBody: FC<Proptypes> = ({
    reqTypes,
    updateReqTypeHandler, deleteReqTypeHandler,
    reqTypeIds, handler,
}) => {
    const { togglersRedux: { isOnline }} = useTogglersRedux();
    const [ updateReqTypeId, setUpdateReqTypeId ] = useState('');
    const [ tempReqTypeName, setTempReqTypeName ] = useState('');

    return (
        <Tbody>
            {
                reqTypes.map((reqType) => (
                    <tr
                        key = { reqType.id }
                        style = { reqTypeIds?.includes(reqType.id) ? { backgroundColor: 'green' } : {} }
                        onClick = { () => handler && updateReqTypeId === '' && void handler(reqType.id) }>
                        <td style = {{ textAlign: 'center', maxWidth: 200, width: '100%' }}>
                            {
                                updateReqTypeId !== reqType.id
                                    ? reqType.name
                                    : (
                                        <UpdateContainer>
                                            <Input
                                                placeholder = 'Type name'
                                                value = { tempReqTypeName }
                                                onChange = { (event) => void setTempReqTypeName(event.target.value) }
                                                onClick = { (event) => void event.stopPropagation() }
                                            />
                                        </UpdateContainer>
                                    )
                            }
                        </td>
                        <td style = {{ display: 'flex', justifyContent: 'center' }}>
                            {
                                updateReqTypeId !== reqType.id
                                    ? (
                                        <>
                                            <Button
                                                disabled = { !isOnline }
                                                title = 'Settings'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    setUpdateReqTypeId(reqType.id);
                                                    setTempReqTypeName(reqType.name);
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'wrench'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                            <Button
                                                disabled = { !isOnline }
                                                title = 'Delete'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    deleteReqTypeHandler(reqType.id);
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'trash-alt'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                        </>
                                    )
                                    : (
                                        <>
                                            <Button
                                                disabled = { !isOnline }
                                                title = 'Save'
                                                onClick = { async (event) => {
                                                    event.stopPropagation();
                                                    const isUpdated = await updateReqTypeHandler(
                                                        reqType.id, tempReqTypeName,
                                                    );

                                                    if (isUpdated) {
                                                        setUpdateReqTypeId('');
                                                        setTempReqTypeName('');
                                                    }
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'save'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                            <Button
                                                title = 'Cancel'
                                                onClick = { (event) => {
                                                    event.stopPropagation();
                                                    setUpdateReqTypeId('');
                                                    setTempReqTypeName('');
                                                } }>
                                                <FontAwesomeIcon
                                                    color = '#000'
                                                    icon = 'times'
                                                    style = {{ width: 16, height: 16 }}
                                                />
                                            </Button>
                                        </>
                                    )
                            }
                        </td>
                    </tr>
                ))
            }
        </Tbody>
    );
};

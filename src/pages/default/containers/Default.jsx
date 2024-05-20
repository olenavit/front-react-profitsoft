import {useIntl} from 'react-intl';
import React, {useEffect, useState} from 'react';
import Typography from 'components/Typography';
import PlayerList from "../../../components/PlayerList";
import Button from "../../../components/Button";
import {useNavigate} from "react-router-dom";
import TablePagination from "../../../components/TablePagination";
import TextField from "../../../components/TextField";
import {useDispatch, useSelector} from "react-redux";
import actionPlayer from "../../../app/actions/player";
import storage, {keys} from "../../../misc/storage";
import SnackBar from "../../../components/SnackBar";
import Dialog from "../../../components/Dialog";
import {Box} from "@mui/material";
import Loading from "../../../components/Loading";

function Default() {
    const dispatch = useDispatch();
    const {formatMessage} = useIntl();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [isOpenDialog, setIsOpenDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null)
    const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);

    const pagination = JSON.parse(storage.getItem(keys.PAGINATION)) || {page: 0, size: 3}

    const {
        players,
        isFetchingPlayers,
        isDeleting,
        isSuccessDeleted
    } = useSelector(({player}) => player);

    const state = useSelector(({player}) => player);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        const localPagination = {
            page: newPage,
            size: pagination.size
        }
        storage.setItem(keys.PAGINATION, JSON.stringify(localPagination))
        dispatch(actionPlayer.fetchPlayers({
            ...localPagination,
            name: name,
            surname: surname
        }));
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const localPagination = {
            page: 0,
            size: parseInt(event.target.value, 10)
        }
        storage.setItem(keys.PAGINATION, JSON.stringify(localPagination))
        dispatch(actionPlayer.fetchPlayers({
            ...localPagination,
            name: name,
            surname: surname
        }));

    };

    const handleAddPlayer = () => {
        navigate(`/player/new`)
    }
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleSurname = (e) => {
        setSurname(e.target.value)
    }
    const onSearch = () => {
        storage.setItem(keys.FILTER, JSON.stringify({name, surname}))
        dispatch(actionPlayer.fetchPlayers({
            page: 0,
            size: pagination.size,
            name: name,
            surname: surname
        }))
    }

    useEffect(() => {
        const filter = JSON.parse(storage.getItem(keys.FILTER));
        if (filter) {
            setName(filter.name);
            setSurname(filter.surname)
        }
    }, []);


    useEffect(() => {
        fetchPlayers()
    }, [])


    const onCancel = () => {
        setIsOpenDialog(false);
    }

    const handleCloseSnackBar = () => {
        setIsOpenSnackBar(false);
    };

    const handleOpenDialog = (id) => {
        setIsOpenDialog(true)
        setDeleteId(id)
    }

    const handleDelete = () => {
        dispatch(actionPlayer.fetchDeletePlayer(deleteId))
        setIsOpenDialog(false)
        setIsOpenSnackBar(true)
        fetchPlayers()
    }

    const fetchPlayers = () => {
        const paginationLocal = JSON.parse(storage.getItem(keys.PAGINATION)) || pagination;
        const filterLocal = JSON.parse(storage.getItem(keys.FILTER)) || {name, surname};
        dispatch(actionPlayer.fetchPlayers({
            page: paginationLocal.page,
            size: paginationLocal.size,
            name: filterLocal.name,
            surname: filterLocal.surname
        }));
    }

    const renderSnackBar = (status, isOpen) => {
        if (!status) {
            return (<SnackBar open={isOpen} severity="error" onClose={handleCloseSnackBar}>Error. Try again
                later</SnackBar>)

        }
        if (status) {
            return (<SnackBar open={isOpen} severity="success" onClose={handleCloseSnackBar}>Player was successfully
                deleted</SnackBar>)
        }

    }


    return (
        <>
            <Dialog open={isOpenDialog}>
                <Typography variant="h4" align="center">Are you sure you want to delete player?</Typography>
                <Box sx={{display: "flex", gap: "10px", justifyContent: "flex-end"}}>
                    <Button size="small" onClick={onCancel}>NO</Button>
                    <Button size="small" onClick={handleDelete}>YES</Button>
                </Box>
            </Dialog>
            <Button onClick={handleAddPlayer}>{formatMessage({id: 'addPlayer'})}</Button>
            <Typography>
                <TextField onChange={handleName} label={formatMessage({id: 'searchByName'})} value={name}/>
                <TextField onChange={handleSurname} label={formatMessage({id: 'searchBySurname'})} value={surname}/>
                <Button size="small" onClick={onSearch}>{formatMessage({id: 'search'})}</Button>
                {isFetchingPlayers && <Loading/>}
                {!isFetchingPlayers &&
                    <>
                        <PlayerList items={players?.list} handleDelete={handleOpenDialog}/>
                        <TablePagination page={pagination.page}
                                         rowsPerPage={pagination.size}
                                         count={players?.totalElements || 0}
                                         onPageChange={handleChangePage}
                                         onRowsPerPageChange={handleChangeRowsPerPage}
                                         labelRowsPerPage={formatMessage({id: 'rowsPerPage'})}
                        />
                    </>
                }

            </Typography>
            {renderSnackBar(isSuccessDeleted, isOpenSnackBar)}
        </>
    )

}

export default Default;

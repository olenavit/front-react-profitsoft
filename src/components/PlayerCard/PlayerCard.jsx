import Card from "../Card";
import CardContent from "../CardContent";
import Typography from "../Typography";
import CardActions from "../CardActions";
import Button from "../Button";
import TextField from "../TextField";
import IconButton from "../IconButton";
import EditIcon from '@mui/icons-material/Edit';
import {Grid} from "@mui/material";
import {useEffect, useState} from "react";
import SnackBar from "../SnackBar";
import {useNavigate, useParams} from "react-router-dom";
import {useIntl} from "react-intl";
import actionPlayer, {MOCK_USER_LIST_RESPONSE} from "../../app/actions/player";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

const PlayerCard = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [yearOfBirth, setYearOfBirth] = useState('');
    const [position, setPosition] = useState('');
    const [isEdit, setIsEdit] = useState(false);
    const [isShowMessage, setShowMessage] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const navigate = useNavigate();
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    let {id} = useParams();

    const {
        isSuccessCreated,
        createdPlayer
    } = useSelector(({player}) => player);

    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        yearOfBirth: false,
        team: false,
        position: false
    })

    const errorMessages = {
        required: formatMessage({id: 'message.required'})
    }


    const validate = (value) => {
        return value === "";
    }

    const handleEdit = () => {
        setIsEdit(true);
    }

    useEffect(() => {
        if (isSuccessCreated) {
            navigate(`/player/${createdPlayer?.id}`)
            setIsEdit(false)
        }
    }, [isSuccessCreated])



    useEffect(() => {
        if (id === 'new') {
            console.log('useEffect id', id)
            setIsCreate(true)
            setIsEdit(true);
            return
        }

        axios.get(`http://localhost:8080/api/player/${id}`)
            .catch(() => {
                return MOCK_USER_LIST_RESPONSE.list?.find((player) => {
                   return player?.id.toString() === id
               })
            })
            .then((data) => {
                const {
                    name,
                    surname,
                    yearOfBirth,
                    position
                } = data
                setName(name);
                setSurname(surname);
                setYearOfBirth(yearOfBirth);
                setPosition(position);
                setIsEdit(false);
            })

    }, [id]);


    const handleName = (e) => {
        if (isEdit)
            setName(e.target.value)
    }

    const handleSurname = (e) => {
        if (isEdit)
            setSurname(e.target.value)
    }

    const handleYearOfBirth = (e) => {
        if (isEdit)
            setYearOfBirth(e.target.value)
    }

    const handlePosition = (e) => {
        if (isEdit)
            setPosition(e.target.value)
    }

    const onCancel = () => {
        setIsEdit(false);
        navigate(0)
    }

    const validateForm = () => {
        const values = {
            name: name,
            surname: surname,
            yearOfBirth: yearOfBirth,
            position: position
        }

        const errors = {}

        for (const key in values) {
            validate()
            errors[key] = validate(values[key])
        }
        setErrors(errors);

        const hasErrors = Object.values(errors).some(value => value === true);

        return !hasErrors;

    }


    const onCreate = () => {
        if (!validateForm()) {
            return
        }
        dispatch(actionPlayer.fetchCreatePlayer({id, name, surname, yearOfBirth, position}))
        setShowMessage(true)
    }


    const renderSnackBar = (status, isOpen) => {
        if (!status) {
            return (<SnackBar open={isOpen} severity="error"
                              onClose={handleClose}>{formatMessage({id: 'snackBar.message.error'})}</SnackBar>)

        }
        if (isCreate) {
            return (<SnackBar open={isOpen} severity="success"
                              onClose={handleClose}>{formatMessage({id: 'snackBar.message.created'})}</SnackBar>)
        }
        return (<SnackBar open={isOpen} severity="success"
                          onClose={handleClose}>{formatMessage({id: 'snackBar.message.updated'})}</SnackBar>)
    }

    const handleClose = () => {
        setShowMessage(false);
    };

    const onReturn = () => {
        navigate("/-1")
    };

    return (
        <div>
            {renderSnackBar(isSuccessCreated, isShowMessage)}
            <Button size="small" onClick={onReturn}>{formatMessage({id: 'button.back'})}</Button>
            <Card sx={{maxWidth: 345}}>
                    <CardContent>
                        <Grid container justifyContent="flex-end">
                            <IconButton onClick={handleEdit}>
                                <EditIcon/>
                            </IconButton>
                        </Grid>
                        <Typography gutterBottom variant="h5" component="div">
                            <TextField onChange={handleName} label={formatMessage({id: 'field.firstName'})} value={name}/>
                            {errors.name && errorMessages.required}
                            <TextField onChange={handleSurname} label={formatMessage({id: 'field.lastName'})}
                                       value={surname}/>
                            {errors.surname && errorMessages.required}
                            <TextField onChange={handleYearOfBirth} label={formatMessage({id: 'field.yearOfBirth'})}
                                       value={yearOfBirth}/>
                            {errors.yearOfBirth && errorMessages.required}
                            <TextField onChange={handlePosition} label={formatMessage({id: 'field.position'})}
                                       value={position}/>
                            {errors.position && errorMessages.required}
                        </Typography>
                    </CardContent>


                {isEdit &&
                    <CardActions>
                        <Button size="small" onClick={onCancel}>{formatMessage({id: 'button.cancel'})}</Button>
                        {isCreate &&
                            <Button size="small" onClick={onCreate}>{formatMessage({id: 'button.create'})}</Button>}
                        {!isCreate &&
                            <Button size="small" onClick={onCreate}>{formatMessage({id: 'button.save'})}</Button>}
                    </CardActions>}

            </Card>
        </div>
    )
}
export default PlayerCard;

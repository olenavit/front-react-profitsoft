import {CardHeader} from "@mui/material";
import Card from "../Card";
import {useNavigate} from "react-router-dom";
import IconButton from "../IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {createUseStyles} from "react-jss";
import useTheme from "../../misc/hooks/useTheme";
import classNames from "classnames";

const getClasses = createUseStyles((theme) => ({
    container: {
        position: "relative",
        '&:hover': {
            "& .icon": {
                opacity: "1 !important"
            }
        }
    },
    icon: {
        position: "absolute",
        right: "20px",
        top: "15px",
        display: "block",
        opacity: 0

    }
}))
const PlayerListItem = ({player,handleDelete}) => {
    const {
        id,
        name,
        surname
    } = player;

    const {theme} = useTheme()
    const classes = getClasses({theme});

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/player/${id}`)
    }

    return (
        <>
            <div className={classes.container}>
                <div onClick={handleClick}>
                    <Card>
                        <CardHeader title={name} subheader={surname}/>
                    </Card>
                </div>
                <div className={classNames(classes.icon, "icon")}>
                    <IconButton onClick={()=>handleDelete(id)}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
        </>
    )
}
export default PlayerListItem;
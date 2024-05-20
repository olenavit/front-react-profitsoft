import PlayerCard from "../../../components/PlayerCard";
import {useIntl} from "react-intl";

const PlayerDetailPage = () => {
    const {formatMessage} = useIntl();

    return (
        <div>
            <h1>{formatMessage({id: 'title'})}</h1>
            <PlayerCard/>
        </div>
    )
}
export default PlayerDetailPage;
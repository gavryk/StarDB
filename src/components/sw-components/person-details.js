import ItemDetails, {Record} from "../item-details";
import React from "react";
import { withSwapiService } from '../hoc-helper';


const PersonDetails = (props) => {
    return (
        <ItemDetails {...props} >
            <Record field='gender' label='Gender'/>
            <Record field='eyeColor' label='Eye color'/>
        </ItemDetails>
    )
};
const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};


export default withSwapiService(mapMethodsToProps)(PersonDetails);
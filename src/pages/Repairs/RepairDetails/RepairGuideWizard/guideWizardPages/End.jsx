import React from 'react';
import Divider from "@material-ui/core/Divider";



const End = ({repairDetails}) => {

    return (
        <>
            Status "end":<br/>
            - Odebrane / To tyle z naszej strony (oby nie) do zobaczenia! :)<br/>
            <div className={"repairActionsWrapper"}>
                <div>
                </div>
            </div>
            <Divider/>
        </>
    );
};

export default End;
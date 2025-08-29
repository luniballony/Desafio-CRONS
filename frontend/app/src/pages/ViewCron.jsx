// página para ver cron individualmente
import React, { useEffect, useState} from "react";
import { useParams } from "react-router-dom";


function ViewCron () {
    const {uriId}  = useParams();

    return (
        <div>
            <p>{uriId}</p>
        </div>
        );
}

export default ViewCron
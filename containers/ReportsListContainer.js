// @flow
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {getReports} from '../actions/routeActions';
import { ReportsList } from "../components/ReportsList";


export function ReportsListContainer() {
    const stateProps = useSelector(state => {
        return {
            reports: state.map.reports,
            loading: state.map.loading,
            errorMessage: state.map.errorMessage,
            authToken: state.user.authToken,
        };
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshReports: (authToken) => getReports(authToken)
        },
        dispatch
    ), [dispatch]);

    return (<ReportsList {...stateProps} {...boundActionProps} />);

}
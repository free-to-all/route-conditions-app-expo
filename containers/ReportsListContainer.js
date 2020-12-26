// @flow
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {getReports, refreshCurrentPosition, submitReport} from '../actions/routeActions';
import { ReportsList } from "../components/ReportsList";


export function ReportsListContainer() {
    const stateProps = useSelector(state => {
        return {
            reports: state.map.reports,
            loading: state.map.loading,
            errorMessage: state.map.errorMessage,
            currentLocation: state.map.currentLocation,
            authToken: state.user.authToken,
        };
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            onRefreshReports: (authToken) => getReports(authToken),
            onRefreshCurrentPosition: () => refreshCurrentPosition(),
            submitReport: (report) => submitReport(stateProps.authToken, report),
        },
        dispatch
    ), [dispatch]);

    return (<ReportsList {...stateProps} {...boundActionProps} />);

}
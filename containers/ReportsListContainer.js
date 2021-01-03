// @flow
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {ReportsList} from "../components/ReportsList";
import {refreshReports} from "../redux/slices/reportsSlice";
import {refreshCurrentPosition} from "../redux/slices/currentLocationSlice";
import {submitReport} from "../redux/slices/submitReportSlice";


export function ReportsListContainer() {
    const stateProps = useSelector(state => {
        return {
            reports: state.map.reports.reports,
            loading: state.map.reports.loading,
            errorMessage: state.map.reports.errorMessage,
            currentLocation: state.map.currentLocation.location,
            authToken: state.user.authToken,
        };
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            refreshReports: (authToken, loading) => refreshReports(authToken, loading),
            refreshCurrentPosition: () => refreshCurrentPosition(),
            submitReport: (report) => submitReport(stateProps.authToken, report),
        },
        dispatch
    ), [dispatch]);

    return (<ReportsList {...stateProps} {...boundActionProps} />);

}
// @flow
import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "redux";
import {refreshCurrentPosition, submitReport} from '../redux/actions/reportsActions';
import {ReportsList} from "../components/ReportsList";
import {refreshReports} from "../redux/slices/reportsSlice";


export function ReportsListContainer() {
    const stateProps = useSelector(state => {
        return {
            reports: state.map.reports.reports,
            loading: state.map.reports.loading,
            errorMessage: state.map.reports.errorMessage,
            currentLocation: state.map.currentLocation,
            authToken: state.user.authToken,
        };
    });

    const dispatch = useDispatch();

    const boundActionProps = useMemo(() => bindActionCreators(
        {
            refreshReports: (authToken) => refreshReports(authToken),
            refreshCurrentPosition: () => refreshCurrentPosition(),
            submitReport: (report) => submitReport(stateProps.authToken, report),
        },
        dispatch
    ), [dispatch]);

    return (<ReportsList {...stateProps} {...boundActionProps} />);

}
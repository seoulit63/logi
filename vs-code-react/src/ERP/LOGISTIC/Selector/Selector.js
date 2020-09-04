import { createSelector } from 'reselect';

// i know there's no computed data for our project but i still made it just to remember by.

// input selector //

const selectLogi = state => state.LOGIReducer;



// output selector //

export const selectStockLog = createSelector(
    [selectLogi],
    logi => logi.logData
)

export const selectRowData = createSelector(
    [selectLogi],
    logi => logi.rowData
)

export const selectSubRowData = createSelector(
    [selectLogi],
    logi => logi.subRowData
)

export const selectDeliveryData = createSelector(
    [selectLogi],
    logi => logi.DeliveryData
)

export const selectOpenDialog = createSelector(
    [selectLogi],
    logi => logi.isOpen
)

export const selectOpenSubDialog = createSelector(
    [selectLogi],
    logi => logi.isSubOpen
)

export const selectDeliveryOpen = createSelector(
    [selectLogi],
    logi => logi.isDeliveryOpen
)

export const selectCodeName = createSelector(
    [selectLogi],
    logi => logi.codeName
)
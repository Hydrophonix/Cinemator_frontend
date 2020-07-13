export type Params = {
    projectId: string
}

export type PropTypes = {}

type stringOrDate = string | Date

export type EventTypes = {
    workdayId: string
    start: stringOrDate
    end: stringOrDate
    sceneNumbers: string
    requisitesCount: number
}

export type DataTypes = {
    event: EventTypes;
    start: stringOrDate;
    end: stringOrDate;
    allDay: boolean;
}

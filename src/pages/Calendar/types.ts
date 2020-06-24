export type Params = {
    projectId: string
}

export type PropTypes = {}

type stringOrDate = string | Date

export type EventTypes = {
    start: stringOrDate
    end: stringOrDate
    id: string
    title: string
    backgroundColor?: string
    allDay?: boolean
    url: string
    desc?: string
}

export type DataTypes = {
    event: EventTypes;
    start: stringOrDate;
    end: stringOrDate;
    allDay: boolean;
}

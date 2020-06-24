export type Params = {
    projectId: string
}

export type PropTypes = {}

type stringOrDate = string | Date

export type EventTypes = {
    id: string
    start: stringOrDate
    end: stringOrDate
    title: string | null
    location: string | null,
    sceneNumber: number,
}

export type DataTypes = {
    event: EventTypes;
    start: stringOrDate;
    end: stringOrDate;
    allDay: boolean;
}

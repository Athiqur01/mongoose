import { Types } from "mongoose"


export interface INote {
    title: string,
    content: string,
    category: string,
    pinned: boolean,
    tag: {
         label: string,
         color: string
        },
    userId: Types.ObjectId
}

  
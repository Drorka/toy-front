import { Fragment } from 'react'

export function MsgPreview({ msg }) {
    console.log('msg:', msg)
    return <Fragment>
        <h3>{msg.by.fullname}</h3>
        <p>{msg.txt}</p>
    </Fragment>
}
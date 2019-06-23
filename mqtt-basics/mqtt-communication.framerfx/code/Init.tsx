import * as React from "react"
import { Frame } from "framer"
import { useMQTTMessages } from "./MqttConnector"

export function Init() {
    const isMessage = useMQTTMessages()
    return (
        <Frame width="100%" height="100%">
            {isMessage}
        </Frame>
    )
}

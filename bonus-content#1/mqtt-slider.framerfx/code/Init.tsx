import * as React from "react"
import { Frame, useCycle, Page } from "framer"
import { useMQTTMessages } from "./MqttConnector"
import { Slider } from "./Slider"

export function Init() {
    const [isMessage, publish] = useMQTTMessages()
    return (
        <Frame background={"grey"} width="100%" height="100%">
            <Slider
                onChange={sliderValue =>
                    publish("framerX", sliderValue.toString())
                }
            />
        </Frame>
    )
}

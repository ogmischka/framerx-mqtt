import * as React from "react"
import { Frame, useCycle, Page } from "framer"
import { useMQTTMessages } from "./MqttConnector"
import { RandomImage } from "./canvas"

export function Init() {
    const [
        isHue,
        isBrightness,
        isGrayscale,
        isPage,
        publish,
    ] = useMQTTMessages()
    console.log(isPage)
    return (
        <Frame
            style={{
                filter:
                    "brightness(" +
                    isBrightness +
                    ") hue-rotate(" +
                    isHue +
                    ")  grayscale(" +
                    isGrayscale +
                    ")",
            }}
            width="100%"
            height="100%"
            background="white"
        >
            <Page
                style={{ border: "1px grey solid" }}
                defaultEffect={"coverflow"}
                width="100%"
                height="100%"
                currentPage={isPage}
            >
                <RandomImage />
                <RandomImage />
                <RandomImage />
                <RandomImage />
                <RandomImage />
                <RandomImage />
            </Page>
        </Frame>
    )
}

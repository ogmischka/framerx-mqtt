import * as React from "react"
import { Frame, useCycle, Stack } from "framer"
import { useMQTTMessages } from "./MqttConnector"
import { Slider } from "./Slider"

export function Init() {
    const [isMessage, publish] = useMQTTMessages()
    return (
        <Frame background={"#444"} width="100%" height="100%">
            <Stack width="90%" height="60%" distribution={"space-around"}>
                <Slider
                    label={"Brightness"}
                    max={200}
                    value={0.5}
                    onChange={sliderValue =>
                        publish(
                            "brightness",
                            Math.round(sliderValue).toString()
                        )
                    }
                />
                <Slider
                    label={"Hue"}
                    max={350}
                    onChange={sliderValue =>
                        publish("hue", Math.round(sliderValue).toString())
                    }
                />
                <Slider
                    label={"Grayscale"}
                    max={100}
                    onChange={sliderValue =>
                        publish("grayscale", Math.round(sliderValue).toString())
                    }
                />
            </Stack>
        </Frame>
    )
}

import { Data, Override } from "framer"
import { useMQTTMessages } from "./MqttConnector"

const data = Data({
    brightness: 100,
    hue: 100,
    grayscale: 100,
})

export function brightness(): Override {
    const [isHue, isBrightness, isGrayscale] = useMQTTMessages()
    return {
        text: isBrightness,
    }
}
export function hue(): Override {
    const [isHue, isBrightness, isGrayscale] = useMQTTMessages()
    return {
        text: isHue,
    }
}
export function grayscale(): Override {
    const [isHue, isBrightness, isGrayscale] = useMQTTMessages()
    return {
        text: isGrayscale,
    }
}

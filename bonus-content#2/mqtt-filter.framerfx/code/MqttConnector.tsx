import React, { useState, useEffect } from "react"
import { transform } from "framer"
//import mqttConnect
import { connect as mqttConnect } from "mqtt"

//connect to our broker
//IMPORTANT: you have to add "ws://" and the websockets port
// use "ws://test.mosquitto.org:8080" for public broker
let mqttClient = mqttConnect("ws://your.ip.here:9001")
let data

//export MQTT
export function useMQTTMessages() {
    //creating our state here
    const [isHue, setHue] = useState("0deg")
    const [isBrightness, setBrightness] = useState("100%")
    const [isGrayscale, setGrayscale] = useState("0%")
    const [isPage, setPage] = useState(0)
    useEffect(() => {
        mqttClient.on("connect", function() {
            mqttClient.subscribe("hue")
            mqttClient.subscribe("brightness")
            mqttClient.subscribe("grayscale")
            mqttClient.subscribe("page")
        })
        mqttClient.on("message", function(topic, message) {
            try {
                data = JSON.parse(message)
            } catch (e) {
                console.log("parsing error", topic, message)
                data = message
            }
            if (topic == "brightness") {
                setBrightness(data.toString() + "%")
            }
            if (topic == "hue") {
                setHue(data.toString() + "deg")
            }
            if (topic == "grayscale") {
                setGrayscale(data.toString() + "%")
            }
            if (topic == "page") {
                //mapping values form arduino
                setPage(Math.round(transform(data, [0, 4096], [0, 5])))
            }
        })

        return function cleanup() {}
    })
    //returning all states
    return [
        isHue,
        isBrightness,
        isGrayscale,
        isPage,
        (topic, message) => {
            mqttClient.publish(topic, message)
        },
    ]
}

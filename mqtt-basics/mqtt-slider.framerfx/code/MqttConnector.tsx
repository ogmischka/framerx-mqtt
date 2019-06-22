import React, { useState, useEffect } from "react"
//import mqttConnect
import { connect as mqttConnect } from "mqtt"

//connect to our broker
//IMPORTANT: you have to add "ws://" and the websockets port
let mqttClient = mqttConnect("ws://192.168.1.201:9001")

//export MQTT
export function useMQTTMessages() {
    //creating our state here
    const [isMessage, setMessage] = useState(null)
    useEffect(() => {
        mqttClient.on("connect", function() {})
        mqttClient.on("message", function(topic, message) {})
    })
    //returning
    return [
        isMessage,
        (topic, message) => {
            mqttClient.publish(topic, message)
        },
    ]
}

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
        mqttClient.on("connect", function() {
            // subscribe on a topic after connected
            mqttClient.subscribe("framerX")
            // send a message to test if the connection is working
            mqttClient.publish("framerX", "Hello World")
        })

        mqttClient.on("message", function(topic, message) {
            // set the state to received message
            console.log(message.toString())
            setMessage(message.toString())
        })
    })
    //returning
    return isMessage
}

// This example uses an ESP32 Development Board
// to connect to shiftr.io.
//
// You can check on your device after a successful
// connection here: https://shiftr.io/try.
//
// by Joël Gähwiler
// https://github.com/256dpi/arduino-mqtt

#include <WiFi.h>
#include <MQTT.h>

//WIFI 
const char ssid[] = "WIFI NAME";
const char pass[] = "WIFI PASSWORD";

//SENSOR INPUT
int sensorPin = A3;    // select the input pin for the potentiometer
int sensorValue = 0;  // variable to store the value coming from the sensor


WiFiClient net;
MQTTClient client;

void connect() {
  Serial.print("checking wifi...");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(1000);
  }

  Serial.print("\nconnecting...");
  while (!client.connect("CLIENT_NAME", "try", "try")) {
    Serial.print(".");
    delay(1000);
  }

  Serial.println("\nconnected!");
  client.subscribe("led"); //subscribe to a topic for led


}


void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, pass);


  // Note: Local domain names (e.g. "Computer.local" on OSX) are not supported by Arduino.
  // You need to set the IP address directly.
  client.begin("BROKER.IP.HERE", net);
  connect();
}

void loop() {
  client.loop();
  delay(100);  // <- fixes some issues with WiFi stability
  sensorValue = analogRead(sensorPin);
  if (!client.connected()) {
    connect();
  }
  client.publish("page", String(sensorValue));
}

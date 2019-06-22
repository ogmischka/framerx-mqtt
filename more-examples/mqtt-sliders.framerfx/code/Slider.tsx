import * as React from "react"
import { Frame, useMotionValue, useTransform } from "framer"
//Photo Filter with Labels & Custom Color › by Freddie Iboy
//https://codesandbox.io/s/0xzyjn52nn

export function Slider({
    label = "None",
    colorScheme = "#fff",
    min = 0,
    max = 1,
    value = 0,
    onChange,
}) {
    const position = useMotionValue(value * 300)
    const newValue = useTransform(position, [0, 300], [min, max])
    return (
        <Frame width={300} height={80} background={null} center>
            <Frame
                name="Rail"
                width={300}
                height={6}
                borderRadius={3}
                center
                background="rgba(255,255,255,.2)"
            >
                <Frame
                    name="Fill"
                    width={position}
                    height={6}
                    borderRadius="inherit"
                    background={colorScheme}
                />
                <Frame
                    name="Knob"
                    x={position}
                    size={40}
                    center="y"
                    borderRadius="50%"
                    background={colorScheme}
                    shadow="0 2px 8px 1px #242424"
                    left={-20}
                    drag="x"
                    dragConstraints={{ left: 0, right: 300 }}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={function() {
                        if (onChange) onChange(newValue.get())
                    }}
                />
            </Frame>
            <Frame
                top={-25}
                width={300}
                background={null}
                height={40}
                style={{
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "2em",
                }}
            >
                {label}
            </Frame>
        </Frame>
    )
}

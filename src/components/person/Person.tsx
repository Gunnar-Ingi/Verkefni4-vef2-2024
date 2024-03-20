import { useState } from 'react';
import { Button } from '../Button/Button';
import './Person.css';

type Props = {
  name: string;
  favoriteColor?: string;
  age?: number;
}

function findContrastColor(color: string) {
  const hex = color.replace('#', '')
  const r = parseInt(hex.substr(0, 2), 16)
  const g = parseInt(hex.substr(2, 2), 16)
  const b = parseInt(hex.substr(4, 2), 16)

  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  return brightness >= 128 ? '#000000' : '#ffffff'
}

export function Person(props: Props) {
  const [age, setAge] = useState<number>(props.age ?? 0)
  const style: Record<string, string> = {}

  if (props.favoriteColor) {
    const color = findContrastColor(props.favoriteColor);

    style['backgroundColor'] = props.favoriteColor
    style['color'] = color
  }

  const onDecrement = () => {
    console.log('decrement', props)
    setAge(age - 1)
  }

  const onIncrement = () => {
    console.log('increment', props)
    setAge(age + 1)
  }

  return (
    <section className="person" style={style}>
      <h2>{props.name}</h2>
      {age > 0 && (
        <>
          <Button onClick={onDecrement}>-</Button>
          <p>Age: {age}</p>
          <Button onClick={onIncrement}>+</Button>
        </>
      )}

    </section>
  )
}
const Header = (props) => {
    return (
      <h2>{props.name}</h2>
    )
  }
  
  const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
  }
  
  const Content = (props) => {
    return (
      props.parts.map((part) => <Part key= {part.id} part={part.name} exercises={part.exercises}/>)
    )
  }
  
  const Total = (props) => {
    const sum = props.parts.reduce((s,p) => s + p.exercises , 0)
    return (
      <b>total of {sum} exercises</b>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
  }

export default Course
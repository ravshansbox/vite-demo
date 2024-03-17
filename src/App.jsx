import { Component, useEffect, useRef } from "react";

export function App() {
  const ref = useRef(null);

  useEffect(() => {
    console.log("ref.current", ref.current);
  }, []);

  return <Child ref={ref}>Vite React Tailwind</Child>;
}

class Child extends Component {
  render() {
    return <h1>{this.props.children}</h1>;
  }
}

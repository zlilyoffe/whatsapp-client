import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
// import backg from './img/backg.png';


export let Panes = styled.main({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundColor: 'snow'
  // backgroundImage:`url(${backg})`
});

let Header = styled.header({
  backgroundColor: 'mediumturquoise',
  padding: '1em',
  fontFamily: 'fantasy',
  fontSize: '1.2em',
  color: 'white'
});

let Body = styled.div({
  overflow: 'auto',
});

let Container = styled.div(props => ({
  display: 'flex',
  flexDirection: 'column',
  ...props
}));

let Footer = styled.div({
  paddingLeft: '2.4em',
});

export function Pane({width, minWidth, header, body, footer, lastScroll}) {

  let ref = useRef(null);

  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, [lastScroll])

  return <Container {...{width, minWidth}}>
    <Header>{header}</Header>
    <Body ref={ref}>{body}</Body>
    {footer && <Footer>{footer}</Footer>}
  </Container>
}

// {footer && <Footer>{footer} {<button>boom</button>}</Footer>}
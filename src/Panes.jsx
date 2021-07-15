import React, { useEffect, useRef } from 'react';
import styled from 'styled-components/macro';
import backg from './img/backg.png';


export let Panes = styled.main({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundImage:`url(${backg})`
});

let Header = styled.header({
  backgroundColor: 'lavenderblush ',
  padding: '1em'
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
  width: '100vw'
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
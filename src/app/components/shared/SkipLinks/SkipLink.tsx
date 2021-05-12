import styled from "styled-components"

const Nav = styled.nav`
a {
    background: #EC0000;
    color: #FFF;
    font-weight: 700;
    text-decoration: none;
    left: 50%;
    padding: 12px 16px;
    position: absolute;
    transform: translateY(-100%);
    transition: transform 0.3s;
    z-index: -999;

    &:focus {
      transform: translateY(0%);
      z-INDEX: 999;
    }
  }
`


const SkipLink: React.FC = () => (
  <Nav>
    <a href="#a11y-content">Ga naar de content</a>
  </Nav>
)

export default SkipLink
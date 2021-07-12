type Props = {
    personRole: string
  }
  
  const PersonRoleDisplay: React.FC<Props> = ({ personRole }) =>
    <>{ `, ${ personRole }` }</>
  
  export default PersonRoleDisplay
  
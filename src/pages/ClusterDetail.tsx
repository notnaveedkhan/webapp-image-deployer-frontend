import { useParams } from "react-router-dom"

export default function ClusterDetail() {

   const { id } = useParams()
  return (
      <div>ClusterDetail of { id}</div>
  )
}

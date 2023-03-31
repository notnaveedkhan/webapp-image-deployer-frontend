import Dashborad from '../pages/Dashborad'
import Auth from './Auth'
import Protected from './protected'

export default function RootRoute() {
  return (
    <>
      {/* <Auth/> */}
      {/* <Dashborad/> */}
      <Protected/>
    </>
  )
}

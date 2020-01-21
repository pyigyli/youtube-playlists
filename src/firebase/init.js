import firebase from 'firebase/app'
import 'firebase/database'

const config = {
  apiKey: 'AAAAqo9n8Zc:APA91bFx8mIoAu4STygFgtPnwPjNUv-1h40O4hTudVxm0iyC-PWKlQUWjqRWSphlHH8KbJAOgjTy_JAiQuBRvw3r01AKOWEAjXR_-AwzZ_7155_qYLhom53GufzCrVn685VIqIa5iwz7',
  databaseURL: 'https://playlists-225000.firebaseio.com/'
}

firebase.initializeApp(config)

export default firebase.database()

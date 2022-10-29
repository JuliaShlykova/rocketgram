
# Rocketgram (pseudo telegram)
  To see the website visit [rocketgram](https://rocketgram-872da.web.app/).
## Description
  This project is the part of [The Odin Project](https://www.theodinproject.com/). It represents a messenger similar to telegram with simplified functionality:
  - Sign up using google authentication and firebase email/password authentication;
  - Create a chat with any registered user;
  - Create a group with any number of registered users;
  - See what members are in the group;
  - Change a theme (light, bright, dark);
  - Exchange of messages :)  
## References
  Photos were obtained from free photos website [pixels](https://www.pexels.com/), rocket icon was made by me, other icons were from [react-icons](https://react-icons.github.io/react-icons/).
## Technologies used
  - React
  - Firebase Authentication
  - Firebase Firestore
  - Firebase Storage
  - Firebase Hosting
## Firestore database
There are three collections: 'groups', 'users', 'messages'. 'Messages' is defined as a separated collection and not as a part of 'groups' collection to allow an access to messages of the group only if the specific group window is open. It's made to decrease an amount of data sent from the server.
## *Groups*
![Group collection](/src/assets/groups-col.png "group collection")
## *Messages*
![Messages collection](/src/assets/messages-col.png "messages collection")
## *Users*
![Users collection](/src/assets/users-col.png "users collection")

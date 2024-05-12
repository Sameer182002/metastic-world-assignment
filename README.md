
# Multi-Level Marketing API

In this project, I created the multilevel marketing API in which we can add a User along with its parent and then distribute the earnings.



## API Reference

#### Create User

```http
  POST /user/
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. User Name |
| `parentId` | `string` | **Optional**. Parent Id |

#### Get All Users

```http
  GET /user/
```

#### Distribute Earnings

```http
POST /user/distribute
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|   `userId` (Query Params) | `string` | **Required**. User Id (Obtain it while fetching through get API)|
|   `earnings` (in body) | `string` | **Required** Amount|

#### Get Distribute Earnings

```http
GET /user/distribute  
```

| Parameter | Type     | Description                       | Passed In |
| :-------- | :------- | :-------------------------------- | |
|   `userId` | `string` | **Required**. User Id (Obtain it while fetching through get API)| `Query Params` |
|   `earnings` | `string` | **Required** Amount| `Query Params` |

#### How To Run The API

- #### npm run dev




## Documentation

As it is a multilevel marketing api 
- If a user is added without a parent, then it means that is an independent user.
- If a user is added with a parent but that parent doesn't have any ancestors, then the earnings of this user are distributed only to their parent, which is 20%.
- So now if I add user3 with the parent user2 and the parent of user2 is already added user1. So now distribution occurs like the user2 gets 20% and user1 gets 10% because user2 is parent and user1 is grandparent.
- so like this, all flow will happen
- so if there are conditions of total level 8 means any user has only 8 ancestors.


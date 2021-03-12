const database = [{
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "jimmy123!",
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "michaelhao410@gmail.com",
        password: "johnny123!",
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "kooldude_410@hotmail.com",
        password: "jonathan123!",
    },
];

const userModel = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if (user) {
            return user;
        }
        throw new Error(`Couldn't find user with id: ${id}`);
    },
};

module.exports = { database, userModel };
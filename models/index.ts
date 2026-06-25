import User from "./User";
import Contact from "./Contact";

User.hasMany(Contact, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Contact.belongsTo(User, {
    foreignKey: 'user_id'
});

export {
    User,
    Contact
};
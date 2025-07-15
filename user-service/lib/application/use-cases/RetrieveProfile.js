'use strict';

import User from '../../domain/entities/User.js';

export default async (email, { userRepository }) => {

    const user = await userRepository.findByEmail(email);
    if (!user) {
        // todo: Decouple statusCode (HTTP Method) from Business Logic
        throw Object.assign(new Error('user not found'), { statusCode: 404 });
    }

    return {
        username: user.username,
        email:user.email,
        emailVerified:user.emailVerified,
        phone:user.phone,
        bio:user.bio,
        githubUsername:user.githubUsername,
        linkedInUsername:user.linkedInUsername
        // ranking, lastSeen
    }   
};
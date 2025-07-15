export default class IWorkoutRepository {
    async persist(workoutPlanEntity) {
        throw new Error('persist method not implemented');
    }

    async merge(workoutPlanEntity) {
        throw new Error('merge method not implemented');
    }

    async remove(workoutPlanId) {
        throw new Error('remove method not implemented');
    }

    async findById(workoutPlanId) {
        throw new Error('findById method not implemented');
    }

    async findByUserId(userId) {
        throw new Error('findByUserId method not implemented');
    }

    async find() {
        throw new Error('find method not implemented');
    }
};

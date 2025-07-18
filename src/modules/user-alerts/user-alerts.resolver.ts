import { Resolver } from '@nestjs/graphql';
import { UserAlertsService } from './user-alerts.service';
import { UserAlert } from '@/shared/models/graphql/user-alert.model';

@Resolver(() => UserAlert)
export class UserAlertsResolver {

    constructor(private readonly userAlertsService: UserAlertsService) { }

}







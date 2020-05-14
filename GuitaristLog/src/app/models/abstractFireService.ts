import { SnapshotAction } from '@angular/fire/database/database';

export abstract class AbstractFireService {

    protected assignKey(item: SnapshotAction<any>) {
        return { ...item.payload.val(), key: item.key };
      }
}


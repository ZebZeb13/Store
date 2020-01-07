import { MainLinkerInterface } from '../../../common/interfaces/linker.interfaces';

export interface StringLinkerInterface extends MainLinkerInterface {
  readonly value: string;
}

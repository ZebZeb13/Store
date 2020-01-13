import MainLinkerInterface  from '../../../common/interfaces/linker.interfaces';

export default interface StringLinkerInterface extends MainLinkerInterface {
  readonly value: string;
}

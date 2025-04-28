import { EventEmitter, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SuccessHandlingServices {
  @Input() messages: string[] = [];
  emitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  color: string = '';
  icon: string = '';
  toastTitle: string = '';

  handleNewMessages(
    messages: string[],
    color: string,
    icon: string,
    toastTitle: string
  ): void {
    this.messages = [];
    this.messages = messages;
    this.color = color;
    this.icon = icon;
    this.toastTitle = toastTitle;
    this.emitter.emit(true);
  }

  getMessages(): string[] {
    if (Array.isArray(this.messages)) return this.messages;

    return [this.messages];
  }

  getEmmiter(): EventEmitter<boolean> {
    return this.emitter;
  }

  clearMessages(): void {
    this.messages = [];
  }

  getColor(): string {
    return this.color;
  }

  getIcon(): string {
    return this.icon;
  }

  getToastTitle(): string {
    return this.toastTitle;
  }
}

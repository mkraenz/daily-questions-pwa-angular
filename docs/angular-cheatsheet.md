# Angular Cheatsheet

## Component

= 3 files: html, ts, css

- html = structure, content
- ts = data, interactivity
- css = style

## Basic example

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<p>Text here</p>`,
})
export class App {}
```

## Interpolation

Use ``{{ .. }}`

```ts
  template: `<p>{{someComponentVar}} {{ someComponentMethod() }}</p>`,
```

## Component Inclusion

`imports` + use `selector`

```ts
@Component({
  selector: 'app-root',
  template: `<section>
    <other-component-selector />
  </section>`,
  imports: [OtherComponent],
})
export class App {}
```

## Control flow

Uses Angular template syntax (the `@` prefix)

```txt
template: `
  @if(someVar) {
    <p>someVar is true</p>
  }
  @else {

  }
```

### Blocks

```txt
// control flow
@if(var){}
@else {}
@for(x of xs; track x.id) {}

// loading
@defer {}   // defer loading of component
@placeholder {}   // shows before deferred content loads
@loading {}   // shows while deferred content is loaded

@error
```

## Property binding - In-component communication

`[property]="expr"`

dynamically set component attributes or html attributes

It is not the regular interpolation syntax! Interpolation turns everything into a string...

```txt
one-way binding = `[property]="value"`
Two-way binding [(ngModel)]="value"
Event binding (event)="handler()"
```

### Types of bindings

Component -> Template = one-way binding = property binding = `[property]="value"`

Template -> Component = event binding = `(event)="handler()"` (Note the `()`!)

Component <-> Template = Two-way binding = `[(ngModel)]="value"`

Note:
`[()]` aka "banana in a box"

## Component props - Downwards communication

called `input`. Input returns an `InputSignal`!

```ts
@Component({
  template: `<p>The user's occupation is {{ occupation() }}</p>`,
})
class User {
  occupation = input<string>();
}
```

## Upwards communication

called `output`, similar to custom events or signals in svelte

```ts
class Child {
  myEvent = output<string>();
  doStuff() {
    this.myEvent.emit("bla")
  }
}

@Component({
  // this event binds the handleEvent callback to whenever myEvent gets emitted.
  // $event is special syntax that grabs the argument of myEvent.emit so it gets passed to handleEvent in the `ev` parameter.
  template: '<child-selector (myEvent)="handleEvent($event)" />
})
class Parent {
  handleEvent(ev: string){
    console.log(ev);
  }
}
```

## Routing

After integrating the routes array in your app, simply add config:

```ts
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Clickbait page title',
  },
];
```

When navigating use `<a routerLink="/">Home</a>` instead of href => SPA feel

## Forms

- reactive vs template based
- basically always use reactive except for super simple stuff

Reactive form example

```ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="profileForm">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <button type="submit" [disabled]="profileForm.valid">Submit</button>
    </form>
    <h1>profile</h1>
    <p>Name: {{ profileForm.value.name }} Email: {{ profileForm.value.email }}</p>
  `,
  imports: [ReactiveFormsModule],
})
export class App {
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
}
```

## Dependency Injection

```ts
@Injectable({providedIn: 'root'})
export class PlantService {}

@Component({..})
export class App {
  plants = inject(PlantService);
}
```

## Pipes

transform data in templates. Should be pure functions.

look like svelte's event modifiers (both use the pipe `|` character)

```ts
  template: `{{ loudMessage | uppercase }}`,
  imports: [UpperCasePipe],

// parameters get separated by colon
  template: `{{ myDate | date: 'medium' : 'UTC' }}`;
// Jun 15, 2015, 9:43:11 PM.
```

> Pitfall: pipes are only re-executed when the reference changes! Mutations aren't detected.

## Signals

Signals = automatic, reactive updates of template etc. Plain properties = stale values unless manually managed.

```ts
@Component({
  /* ... */
})
export class UserProfile {
  isTrial = signal(false);
  isTrialExpired = signal(false);
  showTrialDuration = computed(() => this.isTrial() && !this.isTrialExpired());

  activateTrial() {
    this.isTrial.set(true);
  }
}
```

## Element References

Writing #textInput on an element gives that DOM element a local name within the template, and viewChild('textInput') queries for it by that name.

It has two uses:

1. In the template itself — you can reference the element directly in other template expressions:
   <input #myInput>
   <button (click)="myInput.focus()">Focus</button>
2. In the component class via viewChild (what we're doing) — Angular resolves the name and gives you a
   signal wrapping the ElementRef:
   private textInput = viewChild<ElementRef<HTMLTextAreaElement>>('textInput');
   // textInput() returns ElementRef | undefined

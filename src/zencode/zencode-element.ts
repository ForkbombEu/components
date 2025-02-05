import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { zencode_exec } from "zenroom";
import { LS, SS, StorageType } from "./utils";

//

export interface ZencodeProps {
  data?: string;
  keys?: string;
  storage?: StorageType;
}

@customElement("zencode-element")
export class Zencode extends LitElement implements ZencodeProps {
  @property({ type: String })
  data?: string;

  @property({ type: String })
  keys?: string;

  @property({ type: String })
  storage?: StorageType;

  //

  @state()
  private contract: string | undefined;

  @state()
  private result: ZenroomResult | undefined;

  //

  runContract() {
    if (!this.contract) return;

    const params: { data?: string; keys?: string } = {};
    if (this.data) params.data = this.data;
    if (this.keys) params.keys = this.keys;

    zencode_exec(this.contract, params)
      .then((r) => {
        this.result = r;
        if (this.storage) {
          if (this.storage === "local") LS(this.id, r.result);
          if (this.storage === "session") SS(this.id, r.result);
        }
      })
      .catch((e) => {
        console.error("Error of " + this.id, e.logs);
      });
  }

  //

  private getContract(slot: HTMLSlotElement) {
    const childNodes = slot.assignedNodes({ flatten: true });

    const allText = childNodes
      .map((node) => {
        return node.textContent ? node.textContent : "";
      })
      .join("");

    const contract = allText
      .split("\n")
      .map((s) => s.trim())
      .join("\n")
      .trim();

    this.contract = contract;
  }

  private handleSlotchange(e: Event) {
    if (!e.target) return;
    const slot = e.target as HTMLSlotElement;
    this.getContract(slot);
  }

  private inputTemplate() {
    return html`
      <div style="display:none">
        <slot @slotchange=${this.handleSlotchange}>
          Please provide a zencode contract
        </slot>
      </div>
    `;
  }

  private contractTemplate() {
    const id = this.id + "-contract";
    if (this.contract)
      return html`
        <div id="${id}" class="container z-contract">
          <p class="container-name">Contract</p>
          <div class="container-content">
            <pre>${this.contract}</pre>
          </div>
        </div>
      `;
  }

  private resultTemplate() {
    if (!this.result) return;

    const { logs, result } = this.result;
    const parsedResult = JSON.parse(result);

    const resultId = this.id + "-result";
    const logsId = this.id + "-logs";

    return html`
      <div id="${resultId}" class="container z-result">
        <p class="container-name">Result</p>
        <div class="container-content">
          <pre>${JSON.stringify(parsedResult, null, 2)}</pre>
        </div>
      </div>

      <div id="${logsId}" class="container z-logs">
        <p class="container-name">Logs</p>
        <div class="container-content">
          <pre>${logs}</pre>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="main">
        ${this.inputTemplate()} ${this.contractTemplate()}
        ${this.resultTemplate()}
      </div>
    `;
  }

  static styles = css`
    p,
    pre {
      margin: 0;
    }

    pre {
      padding: var(--px);
    }

    .main {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      --px: 0.5rem;
    }

    .container {
      border: 2px solid blue;
    }

    .container-name {
      background-color: blue;
      color: white;
      font-family: monospace;
      margin: 0;
      padding: 0 var(--px);
    }

    .container-content {
      overflow-x: auto;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "zencode-element": Zencode;
  }
}

//

type ZenroomResult = Awaited<ReturnType<typeof zencode_exec>>;

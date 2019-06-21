import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {


    let disposable = vscode.commands.registerCommand('extension.crs-call-test', async () => {
        testCRSCall();
    });

    context.subscriptions.push(disposable);
}
export function deactivate() { }


const tableCode: string = `table 50000 MyTable
{
    DataClassification = ToBeClassified;
    
    fields
    {
        field(1;MyField; Integer)
        {
            DataClassification = ToBeClassified;
            
        }
    }
    
    keys
    {
        key(PK; MyField)
        {
            Clustered = true;
        }
    }
    
    var
        myInt: Integer;
    
    trigger OnInsert()
    begin
        
    end;
    
    trigger OnModify()
    begin
        
    end;
    
    trigger OnDelete()
    begin
        
    end;
    
    trigger OnRename()
    begin
        
    end;
    
}`;

async function testCRSCall() {
    if (vscode.workspace.workspaceFolders) {
        var newFile = path.normalize(vscode.workspace.workspaceFolders[0].uri.fsPath + '\\asd.al');
        await fs.writeFileSync(path.normalize(newFile), tableCode);

        await vscode.workspace.openTextDocument(vscode.Uri.parse('file:///' + newFile));
        await vscode.window.showTextDocument(vscode.Uri.parse('file:///' + newFile));

        await vscode.commands.executeCommand("crs.RenameCurrentFile");
    }
}

